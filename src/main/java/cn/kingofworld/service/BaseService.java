package cn.kingofworld.service;

import cn.kingofworld.bean.Pager;
import cn.kingofworld.dao.BaseDao;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

@Transactional
public class BaseService<T, PK extends Serializable> {

    private BaseDao<T, PK> baseDao;

    public BaseDao<T, PK> getBaseDao() {
        return baseDao;
    }

    public void setBaseDao(BaseDao<T, PK> baseDao) {
        this.baseDao = baseDao;
    }

    public T get(PK id) {
        return baseDao.get(id);
    }

    public T load(PK id) {
        return baseDao.load(id);
    }

    public List<T> get(PK[] ids) {
        return baseDao.get(ids);
    }

    public List<T> getList(String sql, int firstResult, int maxResult) {
        return baseDao.getList(sql, firstResult, maxResult);
    }

    public List<T> getList(String sql) {
        return baseDao.getList(sql);
    }

    public T get(String propertyName, Object value) {
        return baseDao.get(propertyName, value);
    }

    public List<T> getList(String propertyName, Object value) {
        return baseDao.getList(propertyName, value);
    }

    public List<T> getAll() {
        return baseDao.getAll();
    }

    public Long getTotalCount() {
        return baseDao.getTotalCount();
    }

    public boolean isUnique(String propertyName, Object oldValue, Object newValue) {
        return baseDao.isUnique(propertyName, oldValue, newValue);
    }

    public boolean isExist(String propertyName, Object value) {
        return baseDao.isExist(propertyName, value);
    }

    public PK save(T entity) {
        return baseDao.save(entity);
    }

    public void update(T entity) {
        baseDao.update(entity);
    }

    public void delete(T entity) {
        baseDao.delete(entity);
    }

    public void delete(PK id) {
        baseDao.delete(id);
    }

    public void delete(PK[] ids) {
        baseDao.delete(ids);
    }

    public void flush() {
        baseDao.flush();
    }

    public void clear() {
        baseDao.clear();
    }

    public void evict(Object object) {
        baseDao.evict(object);
    }

    public Pager findByPager(Pager pager) {
        return baseDao.findByPager(pager);
    }

    public Pager findByPager(Pager pager, DetachedCriteria detachedCriteria) {
        return baseDao.findByPager(pager, detachedCriteria);
    }

}
